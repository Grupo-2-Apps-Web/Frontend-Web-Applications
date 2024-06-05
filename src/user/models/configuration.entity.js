export class Configuration {
    constructor(id, userId, theme, view, allowDataCollection, updateDataSharing) {
        this.id = id;
        this.userId = userId;
        this.theme = theme;
        this.view = view;
        this.allowDataCollection = allowDataCollection;
        this.updateDataSharing = updateDataSharing;
    }
}