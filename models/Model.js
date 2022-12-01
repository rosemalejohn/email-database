import { Model as BaseModel } from 'vue-api-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'

dayjs.extend(relativeTime)
dayjs.extend(utc)

export default class Model extends BaseModel {
  baseURL() {
    return process.env.API_URL
  }

  request(config) {
    return this.$http.request(config)
  }

  get createdAt() {
    if (!this.created_at) {
      return ''
    }
    return dayjs(this.created_at).format('MMMM d, YYYY')
  }

  get localCreatedAt() {
    return dayjs(this.created_at)
      .local()
      .fromNow()
  }
}
