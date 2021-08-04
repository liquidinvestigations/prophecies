import { Model } from '@vuex-orm/core'
import { defaultHeaders, responseNormalizer } from '@/utils/jsonapi'
import settings from '@/settings'
import Choice from '@/models/Choice'
import TaskRecord from '@/models/TaskRecord'

export default class TaskRecordReview extends Model {
  static entity = 'task-record-reviews'

  static fields () {
    return {
      id: this.attr(null),
      url: this.string(),
      status: this.string(),
      note: this.string(),
      alternative_value: this.string(),
      choice_id: this.attr(null),
      choice: this.belongsTo(Choice, 'choice_id'),
      task_record_id: this.attr(null),
      task_record: this.belongsTo(TaskRecord, 'task_record_id')
    }
  }

  static apiConfig = {
    baseURL: `${settings.apiUrl}/task-record-reviews/`,
    dataTransformer: responseNormalizer,
    actions: {
      find (id) {
        return this.get(`${id}/`)
      },
      selectChoice (id, { choice, ...attributes }) {
        const relationships = {
          choice: {
            data: {
              type: 'Choice',
              id: choice.id
            }
          }
        }
        const type = 'TaskRecordReview'
        const data = { type, id, attributes, relationships }
        return this.put(`${id}/`, { data }, { headers: defaultHeaders() })
      }
    }
  }
}
