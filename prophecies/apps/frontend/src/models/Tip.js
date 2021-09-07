import { Model } from '@vuex-orm/core'
import marked from 'marked'
import { responseNormalizer } from '@/utils/jsonapi'
import settings from '@/settings'
import Project from '@/models/Project'
import Task from '@/models/Task'
import User from '@/models/User'

export default class Tip extends Model {
  static entity = 'Tip'

  static fields () {
    return {
      id: this.attr(null),
      name: this.string(),
      description: this.string(),
      project: this.belongsTo(Project, 'projectId'),
      projectId: this.attr(null),
      creator: this.belongsTo(User, 'creatorId'),
      creatorId: this.attr(null),
      task: this.belongsTo(Task, 'taskId'),
      taskId: this.attr(null),
      updatedAt: this.attr(null),
      createdAt: this.attr(null)
    }
  }

  static apiConfig = {
    baseURL: `${settings.apiUrl}/tips/`,
    dataTransformer: responseNormalizer
  }

  get descriptionWithMentions () {
    return String(this.description).replace(User.usernamePattern, (match, p1) => {
      if (User.me() && p1 === User.me().username) {
        return `<span class="mention mention--is-me">${match}</span>`
      }
      return `<span class="mention">${match}</span>`
    })
  }

  get descriptionHTML () {
    return marked(this.descriptionWithMentions)
  }
}
