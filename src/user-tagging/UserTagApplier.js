export { UserTagApplier }
import { TaggedUsersRetriever } from "./TaggedUsersRetriever.js";
import { PostsFormatter } from "../post-manipulation/PostsFormatter.js";

class UserTagApplier {

    constructor() {
        this.taggedUsersRetriever = new TaggedUsersRetriever();
        this.postsFormatter = new PostsFormatter();
    }

    tagTaggedUserPosts(posts) {
        let _this = this;
        this.taggedUsersRetriever.getTaggedUsers((taggedUserDetailList) => {
            for (let taggedUserDetail of taggedUserDetailList) {
                _this.postsFormatter.tagUsersPostsWithinPosts(posts, taggedUserDetail)
            }
        });
    }

}