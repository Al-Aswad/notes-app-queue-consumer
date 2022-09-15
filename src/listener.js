/* eslint-disable no-underscore-dangle */
class Listener {
    constructor(notesService, mailService) {
        this._notesService = notesService;
        this._mailService = mailService;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const { targetEmail, userId } = JSON.parse(message.content.toString());

            const notes = await this._notesService.getNotes(userId);
            const result = await this._mailService.sendEmail(targetEmail, JSON.stringify(notes));
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Listener;
