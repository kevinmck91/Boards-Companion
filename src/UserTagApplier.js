export { UserTagApplier }
import { TaggedUsersRetriever } from "./TaggedUsersRetriever.js";
import { PostsFormatter } from "./PostsFormatter.js";

class UserTagApplier {

    constructor() {
        this.taggedUsersRetriever = new TaggedUsersRetriever();
        this.postsFormatter = new PostsFormatter();
    }

    tagTaggedUserPosts(posts) {
        let _this = this;
        this.taggedUsersRetriever.getTaggedUsers((userDetailsList) => {
            for (let userDetails of userDetailsList) {
                _this.postsFormatter.tagUsersPostsWithinPosts(posts, userDetails);
            }
        });
    }

}