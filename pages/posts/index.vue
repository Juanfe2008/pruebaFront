<template>
  <div>
    <button class="btn btn-primary" @click="showModal = !showModal">
      New Posts
    </button>
    <br />
    <hr />
    <div class="posts" v-if="showModal">
      <div class="col-sm-12">
        <div class="col-sm-4 row">
          <label>Subject</label>
          <input type="text" class="form-control" placeholder="Subject" v-model="newPosts.subject"/>
        </div>
        <div class="col-sm-4 row">
          <label>Category</label>
          <select class="form-control" aria-label="Default select example" v-model="newPosts.category">
            <option value="Science">Science</option>
            <option value="Technologies">Technologies</option>
            <option value="Nature">Nature</option>
          </select>
        </div>
        <div class="col-sm-4 row">
          <label>Posts</label>
          <textarea class="form-control" placeholder="Posts" v-model="newPosts.posts"></textarea>
        </div>
        <br>
        <button class="btn btn-success btn-sm">Save</button>
      </div>
    </div>
    <h3>Written Post</h3>
  </div>
</template>

<script>
import axios from "axios";
import Posts from "../../components/Posts";

export default {
  components: {
    Posts,
  },
  data() {
    return {
      posts: [],
      showModal: true,
      newPosts: [{
        subject: null,
        category: null,
        posts: null
      }]
    };
  },
  async created() {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    this.posts = res.data;
  },
};
</script>

<style scoped>

.post-enter,
.post-leave-to{
  opacity: 0;
}

.post-enter-active,
.post-leave-to-active{
transition: opacity .5s;
}


</style>>
