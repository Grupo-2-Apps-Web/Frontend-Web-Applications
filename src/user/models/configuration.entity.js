export class Configuration {
    constructor(id, theme, view, allowDataCollection, updateDataSharing) {
        this.id = id;
        this.theme = theme;
        this.view = view;
        this.allowDataCollection = allowDataCollection;
        this.updateDataSharing = updateDataSharing;
    }
}