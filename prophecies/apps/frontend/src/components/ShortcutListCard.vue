<template>
  <div class="shortcut-list-card p-3">
    <app-waiter :loader="fetchTasksLoader" waiter-class="my-5 mx-auto d-block">
      <slot name="header" />
      <div :class="contentClass" class="shortcut-list-card__content px-5 pt-4 pb-0">
        <h2 class="shortcut-list-card__content__title" v-if="!hideTitle">
          {{$t('shortcurListCard.shortcuts')}}
        </h2>
        <h3 class="text-primary mb-3">
          {{$t('shortcurListCard.forAllTasks')}}
        </h3>
        <div class="row shortcut-list-card__content__row" v-for="(shortCut, i) in defaultShortcuts" :key="`general-shortcut-${i}`">
          <div class="col shortcut-list-card__content__row__name font-weight-bold">
            {{ shortCut.name }}
          </div>
          <div class="col text-primary font-weight-bold text-capitalize">
            {{ shortCut.value }}
          </div>
        </div>
        <div v-for="task in tasks" :key="task.id" class="mt-4">
          <h3 class="text-primary mb-3">
            {{ task.name }}
            </h3>
          <div :class="{ 'shortcut-list-card__content__row--highlighted': isActiveTask(task) }"
               :key="`task-${task.id}-shortcut-${choice.id}`"
               class="row shortcut-list-card__content__row"
               v-for="choice in task.choiceGroup.choices" >
            <div class="col shortcut-list-card__content__row__name font-weight-bold">
              {{ generateName(choice.value) }}
            </div>
            <div class="col text-primary font-weight-bold text-capitalize">
              {{ choice.shortkeys }}
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center my-5">
          <div>
            <slot name="footer" />
          </div>
        </div>
      </div>
    </app-waiter>
  </div>
</template>

<script>
import { uniqueId } from 'lodash'
import AppWaiter from '@/components/AppWaiter'
import Task from '@/models/Task'

export default {
  name: 'ShortcutListCard',
  components: {
    AppWaiter
  },
  props: {
    contentClass: {
      type: [String, Object, Array],
      default: 'w-100'
    },
    showClose: {
      type: Boolean,
      default: false
    },
    hideTitle: {
      type: Boolean
    }
  },
  data () {
    return {
      defaultShortcuts: [
        {
          name: 'Search',
          value: 'Ctrl + F'
        },
        {
          name: 'Leave a note',
          value: 'Ctrl + Alt + N'
        }
      ]
    }
  },
  computed: {
    fetchTasksLoader () {
      return uniqueId('load-tasks-')
    },
    tasks () {
      return Task.query()
        .with('choiceGroup')
        .with('choiceGroup.choices')
        .where('choiceGroupId', (value) => value !== null)
        .where('taskRecordsCount', (value) => value > 0)
        .get()
    }
  },
  created () {
    return this.setup()
  },
  methods: {
    async setup () {
      try {
        await this.waitFor(this.fetchTasksLoader, this.fetchTasks)
      } catch (error) {
        const title = 'Unable to retrieve shortcuts'
        this.$router.replace({ name: 'error', params: { title, error } })
      }
    },
    async waitFor (loader, fn) {
      this.$wait.start(loader)
      await fn()
      this.$wait.end(loader)
    },
    fetchTasks () {
      const params = { include: 'choiceGroup.choices' }
      return Task.api().get('', { params })
    },
    generateName (value) {
      return `Mark as "${value}"`
    },
    isActiveTask ({ id }) {
      return id === this.$route.params.taskId
    }
  }
}
</script>

<style lang="scss" scoped>
  @keyframes highlightRow {
    from {
      background: #fcf3c4;
    }
    to {
      background: $primary-10;
    }
  }

  .shortcut-list-card {
    background-color: $primary-10;
    border-radius: $card-border-radius;

    &__content {

      &__title {
        color: $tertiary;
        margin-bottom: $spacer-xxl;
        position: relative;
        padding: 0 0 3px;

        &:after {
          content: "";
          position: absolute;
          top: 100%;
          left: 0;
          width: 95px;
          height: 7px;
          background: $warning;
        }
      }

      &__row {
        padding: $spacer-xs $spacer;
        margin: 0;
        margin-bottom: $spacer-sm;

        &--highlighted {
          animation: highlightRow 6s;
        }

        &__name {
          max-width: 200px;
          width: 100%;
        }
      }
    }
  }
</style>
