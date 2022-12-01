<template>
  <div class="container">
    <form style="margin-bottom: 15px">
      <div class="columns is-vcentered">
        <h3 class="column is-size-4">Users</h3>
        <a @click="$refs.filterUsers.show()" class="button is-primary">
          Filter
        </a>
      </div>
    </form>

    <table class="table is-fullwidth is-striped">
      <thead>
        <tr>
          <th></th>
          <th>Gender</th>
          <th>Age</th>
          <th>Email</th>
          <th>Preference</th>
          <th>Activated</th>
          <th>Paying Member</th>
          <th>Source</th>
          <th>Country</th>
          <th>Status</th>
          <th>Date Joined</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in users.data" :key="i">
          <td>
            <b-checkbox />
          </td>
          <td>{{ user.gender }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.looking_for }}</td>
          <td>{{ user.activeAt }}</td>
          <td>{{ user.isPayingMember }}</td>
          <td>
            <span v-if="user.site">{{ user.site.name }}</span>
          </td>
          <td>
            <span v-if="user.country">{{ user.country.name }}</span>
          </td>
          <td>
            <!-- <b-tag :type="cost.statusColor">{{ cost.statusText }}</b-tag> -->
          </td>
          <td>{{ user.createdAt }}</td>
          <td>
            <b-dropdown aria-role="list">
              <template #trigger="{ active }">
                <b-button
                  :icon-right="active ? 'menu-up' : 'menu-down'"
                  size="is-small"
                  label="Manage"
                  type="is-primary"
                />
              </template>

              <b-dropdown-item aria-role="listitem">
                Change status
              </b-dropdown-item>
              <b-dropdown-item aria-role="listitem">
                Delete user
              </b-dropdown-item>
            </b-dropdown>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="is-pulled-right">
      <b-pagination
        :total="users.meta.total"
        :current.sync="users.meta.current_page"
        :per-page="users.meta.per_page"
        @change="onPageChange"
      >
      </b-pagination>
    </div>

    <FilterUsers
      ref="filterUsers"
      @export="exportFilter"
      v-model="filters"
      @input="getUsers"
    />
  </div>
</template>

<script>
import User from '@/models/User'
import FilterUsers from '@/components/dialogs/FilterUsers'

export default {
  head: {
    title: 'Manage Users'
  },
  layout: 'admin',
  middleware: 'auth',
  components: {
    FilterUsers
  },

  data() {
    return {
      downloading: false,
      users: {
        data: [],
        meta: {
          current_page: 1
        }
      },
      filters: {
        gender: '',
        activated: '',
        looking_for: '',
        paying: '',
        date_joined: '',
        status: '',
        site_id: '',
        ages: [18, 70]
      }
    }
  },

  computed: {
    exportUrl() {
      const url = `${this.$axios.defaults.baseURL}/email/users/export?`

      return url
    },
    ageFilter() {
      if (this.filters.ages.length) {
        return this.filters.ages.join(',')
      }
      return ''
    }
  },

  created() {
    this.getUsers()
  },

  methods: {
    async getUsers() {
      this.users = await User.include('country')
        .where('gender', this.filters.gender)
        .where('activated', this.filters.activated)
        .where('looking_for', this.filters.looking_for)
        .where('paying', this.filters.paying)
        .where('date_joined', this.filters.date_joined)
        .where('site_id', this.filters.site_id)
        .where('ages', this.ageFilter)
        .orderBy('-created_at')
        .params({
          limit: 100,
          page: this.users.meta.current_page
        })
        .get()
    },
    deleteUser(user) {
      this.$buefy.dialog.confirm({
        message: 'Are you sure to delete this user?',
        onConfirm: () => {}
      })
    },
    manageCost(cost, status) {
      this.$axios.post(`/cost/costs/${cost.id}/manage`, { status }).then(() => {
        cost.status = status
        this.$buefy.toast.open({
          message: 'Success!',
          type: 'is-success'
        })
      })
    },
    onPageChange(page) {
      this.users.meta.current_page = page
      this.getUsers()
    },
    exportFilter() {
      window.location.replace(this.exportUrl)
    }
  }
}
</script>
