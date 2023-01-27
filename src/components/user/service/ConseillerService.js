class ConseillerService {
 constructor() {
    this.available = [];
 }

 connect(user) {
    if (this.available.filter((conseiller) => conseiller.id === user.id).length) {
        return;
    }

    console.log(this.available);
    this.available.push(user);
 }

 disconnect(user) {
    this.available = this.available.filter((conseiller) => conseiller.id !== user.id);
 }
}

export default new ConseillerService;