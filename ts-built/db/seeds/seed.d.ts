declare const format: any;
declare const db: any;
interface UsersData {
    usersData: {
        username: string;
        bio: string;
        avatar_img_url: string;
    }[];
}
interface KatasData {
    katasData: {
        kata_name: string;
        description: string;
        test_path: string;
        difficulty: string;
        function_template: string;
    }[];
}
interface TopicsData {
    topicsData: {
        topic_name: string;
        description: string;
    }[];
}
interface SolutionsData {
    solutionsData: {
        user_id: number;
        kata_id: number;
        solution: string;
    }[];
}
interface KataTopicsData {
    kataTopicsData: {
        kata_id: number;
        topic_id: number;
    }[];
}
interface CommentsData {
    commentsData: {
        user_id: number;
        kata_id: number;
        comment_body: string;
    }[];
}
declare function seed({ usersData, katasData, topicsData, solutionsData, kataTopicsData, commentsData, }: {
    usersData: UsersData;
    katasData: KatasData;
    topicsData: TopicsData;
    solutionsData: SolutionsData;
    kataTopicsData: KataTopicsData;
    commentsData: CommentsData;
}): Promise<void>;
declare function createUsers(): Promise<any>;
declare function createKatas(): Promise<any>;
declare function createTopics(): Promise<any>;
declare function createSolutions(): Promise<any>;
declare function createKataTopics(): Promise<any>;
declare function createComments(): Promise<any>;
declare function insertUsers(usersData: any): Promise<any>;
declare function insertKatas(katasData: any): Promise<any>;
declare function insertTopics(topicsData: any): Promise<any>;
declare function insertSolutions(solutionsData: any): Promise<any>;
declare function insertKataTopics(kataTopicsData: any): Promise<any>;
declare function insertComments(commentsData: any): Promise<any>;
