import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import Model from './Model'
dayjs.extend(utc)

export default class User extends Model {
  resource() {
    return 'email/users'
  }

  get isPayingMember() {
    return this.is_paying ? 'Yes' : 'No'
  }

  get createdAt() {
    return dayjs.utc(this.created_at).format('MMM DD, YYYY')
  }

  get deletedAt() {
    if (this.deleted_at) {
      return dayjs.utc(this.deleted_at).format('MMM DD, YYYY')
    } else {
      return null
    }
  }

  get activeAt() {
    if (this.active_at) {
      return dayjs.utc(this.active_at).format('MMM DD, YYYY')
    } else {
      return null
    }
  }
}
