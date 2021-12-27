
export class ClassroomsUtils {

    constructor() { }

    private classrooms = [];
    private class_generated = [];

    public async generate_classroom(rooms: any, branch: any) {
        try {
            let cpt = 0;

            while (rooms[cpt].place_nb < branch[0].effectif) {
                cpt++;
            }
            if (rooms.length - cpt >= branch.length) {
                for (let i = 0; i < branch.length; i++) {
                    const tmp = {
                        room: {
                            name: rooms[i + cpt].name,
                            place_nb: rooms[i + cpt].place_nb
                        },
                        branch: {
                            name: branch[i].name,
                            effectif: branch[i].effectif
                        }
                    }
                    this.class_generated.push(tmp);
                }
                return this.class_generated;
            } else {
                for (let i = 0; i < branch.length; i++) {
                    let tmp;
                    if (i == (branch.length - cpt)) {
                        tmp = {
                            room: 'pas de salle disponible',
                            branch: {
                                name: branch[i].name,
                                effectif: branch[i].effectif
                            }
                        }
                    } else {
                        tmp = {
                            room: {
                                name: rooms[i + cpt].name,
                                place_nb: rooms[i + cpt].place_nb
                            },
                            branch: {
                                name: branch[i].name,
                                effectif: branch[i].effectif
                            }
                        }
                    }
                    this.class_generated.push(tmp);
                }
                return this.class_generated;
            }
        } catch (error) {
            throw error;
        }
    }
}