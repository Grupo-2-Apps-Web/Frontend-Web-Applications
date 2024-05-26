export class Configuration {
    constructor(id, user_id, theme, view, allow_data_collection, update_data_sharing) {
        this.id = id;
        this.user_id = user_id;
        this.theme = theme;
        this.view = view;
        this.allow_data_collection = allow_data_collection;
        this.update_data_sharing = update_data_sharing;
    }
}