<template>
  <div class="container">
    <form style="margin-bottom: 15px">
      <div class="columns is-vcentered">
        <h3 class="column is-size-4">Users</h3>
        <a :href="exportUrl" class="button is-primary">Export</a>
      </div>
      <div class="columns is-multiline">
        <div class="column is-2">
          <b-select
            @input="getUsers"
            v-model="filters.gender"
            placeholder="Gender"
            expanded
          >
            <option value="">All Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <!-- <option :value="3">Bi-Sexual</option> -->
          </b-select>
        </div>
        <div class="column is-2">
          <b-select
            @input="getUsers"
            v-model="filters.activated"
            placeholder="Filter Activated"
            expanded
          >
            <option value="">All NA and Activated</option>
            <option :value="1">Activated</option>
            <option :value="0">Not Activated</option>
          </b-select>
        </div>
        <div class="column is-2">
          <b-select
            @input="getUsers"
            v-model="filters.paying"
            placeholder="Filter Paying"
            expanded
          >
            <option value="">All Member</option>
            <option :value="1">Paying Member</option>
            <option :value="0">Non Paying Member</option>
          </b-select>
        </div>
        <div class="column is-2">
          <b-select
            @input="getUsers"
            v-model="filters.status"
            placeholder="Filter Status"
            expanded
          >
            <option value="">All Status</option>
            <option :value="1">New</option>
            <option :value="2">Used</option>
          </b-select>
        </div>
        <div class="column is-2">
          <b-field>
            <b-datepicker
              @input="onChangeRange"
              v-model="dateRange"
              placeholder="Filter by date joined"
              range
            >
            </b-datepicker>
          </b-field>
        </div>
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
          <td>{{ user.amount }}</td>
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
  </div>
</template>

<script>
import dayjs from 'dayjs'
import User from '@/models/User'

export default {
  head: {
    title: 'Manage Users'
  },
  layout: 'admin',
  middleware: 'auth',

  data() {
    return {
      downloading: false,
      dateRange: null,
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
        status: ''
      }
    }
  },

  computed: {
    exportUrl() {
      return `${this.$axios.defaults.baseURL}/email/users/export`
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
        .orderBy('-created_at')
        .params({
          limit: 30,
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
    onChangeRange(dates) {
      const from = dayjs(dates[0])
      const to = dayjs(dates[1])
      this.filters.date_joined = `${from.format('YYYY-MM-DD')},${to.format(
        'YYYY-MM-DD'
      )}`
      this.getUsers()
    },
    onPageChange(page) {
      this.users.meta.current_page = page
      this.getUsers()
    }
  }
}
</script>
