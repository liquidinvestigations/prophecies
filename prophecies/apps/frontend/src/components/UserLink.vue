<script>
import UserCard from '@/components/UserCard'
import User from '@/models/User'

export default {
  name: 'UserLink',
  components: {
    UserCard
  },
  data () {
    return {
      mounted: false
    }
  },
  async mounted () {
    this.mounted = !!await this.$nextTick()
  },
  props: {
    userId: {
      type: [String, Number]
    },
    params: {
      type: Object,
      default: () => ({ })
    },
    useDisplayName: {
      type: Boolean,
      default: false
    },
    noCard: {
      type: Boolean
    }
  },
  computed: {
    user () {
      return User.find(this.userId)
    },
    to () {
      const username = this.user.username
      const params = { username, ...this.params }
      return { name: 'user-retrieve-profile', params }
    },
    label () {
      if (this.useDisplayName) {
        return this.user.displayName
      }
      return `@${this.user.username}`
    }
  }
}
</script>

<template>
  <router-link :to="to" v-if="user" class="user-link">
    <slot v-bind="{ user }">
      {{ label }}
    </slot>
    <template v-if="mounted && !noCard">
      <b-popover :target="$el" triggers="hover focus" placement="bottom" variant="transparent">
        <user-card :user-id="userId" class="user-link__card" background/>
      </b-popover>
    </template>
  </router-link>
</template>

<style lang="scss" scoped>
  .user-link {
    &__card{
      font-size: 1rem;
      min-width: 100%;
      width: 530px;
      max-width: 90vw;
    }
  }
</style>
