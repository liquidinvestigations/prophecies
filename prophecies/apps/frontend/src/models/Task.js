import { Model } from '@vuex-orm/core'
import { responseNormalizer } from '@/utils/jsonapi'
import settings from '@/settings'
import ChoiceGroup from '@/models/ChoiceGroup'
import Project from '@/models/Project'
import TaskChecker from '@/models/TaskChecker'
import TaskTemplateSetting from '@/models/TaskTemplateSetting'
import User from '@/models/User'

export const TaskStatusEnum = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  LOCKED: 'LOCKED'
}
export const TaskStatusOrder = {
  [TaskStatusEnum.OPEN]: 0,
  [TaskStatusEnum.LOCKED]: 0,
  [TaskStatusEnum.CLOSED]: 1
}
export default class Task extends Model {
  static entity = 'Task'

  static fields () {
    return {
      id: this.attr(null),
      url: this.string(),
      name: this.string(),
      description: this.string(),
      checkers: this.belongsToMany(User, TaskChecker, 'taskId', 'checkerId'),
      choiceGroup: this.belongsTo(ChoiceGroup, 'choiceGroupId'),
      choiceGroupId: this.attr(null),
      colors: this.attr(),
      createdAt: this.string(),
      embeddableLinks: this.boolean(),
      priority: this.number(1),
      progress: this.number(0),
      progressByRound: this.attr(),
      project: this.belongsTo(Project, 'projectId'),
      projectId: this.attr(null),
      rounds: this.number(1),
      status: this.string(),
      taskRecordsCount: this.number(0),
      taskRecordsDoneCount: this.number(0),
      templateType: this.string(),
      templateSetting: this.morphTo('templateSettingId', 'templateSettingType'),
      templateSettingId: this.attr(null),
      templateSettingType: this.attr(null),
      userProgress: this.number(0),
      userProgressByRound: this.attr(),
      userTaskRecordsCount: this.number(0),
      userTaskRecordsDoneCount: this.number(0)
    }
  }

  static apiConfig = {
    baseURL: `${settings.apiUrl}/tasks/`,
    dataTransformer: responseNormalizer,
    actions: {
      find (id, config = {}) {
        return this.get(`${id}/`, config)
      }
    }
  }

  get open () {
    return this.status === TaskStatusEnum.OPEN
  }

  get close () {
    return this.status === TaskStatusEnum.CLOSED
  }

  get locked () {
    return this.status === TaskStatusEnum.LOCKED
  }
}
