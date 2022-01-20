export class ClassroomsUtils {

    constructor() { }

    private class_generated = [];

    public async generate(rooms: any, branch: any) {
        try {
            let k = 0;
            let i = 0;
            let ver = false;
            //#region TEST
            // for (i = 0; i < branch.length; i++) {
            //     console.log("i=", i);
            //     console.log("k=", k);
            //     let j;

            //     for (j = k; j < rooms.length; j++) {
            //         if (rooms[j] >= branch[i]) {
            //             k = j + 1;
            //             const tmp = {
            //                 room: rooms[j],
            //                 branch: branch[i]
            //             }
            //             this.class_generated.push(tmp);
            //             break;
            //         }
            //     }
            //     if (j == rooms.length) {
            //         ver = true;
            //         break;
            //     }

            // }
            // if (ver == true) {
            //     for (let l = i; l < branch.length; l++) {
            //         const tmp = {
            //             room: 'non disponible',
            //             branch: branch[l]
            //         }
            //         this.class_generated.push(tmp);
            //     }
            // }
            //#endregion

            //#region VRAI
            for (i = 0; i < branch.length; i++) {
                let j;
                for (j = k; j < rooms.length; j++) {
                    if (rooms[j].place_nb >= branch[i].effectif) {
                        k = j + 1;
                        const tmp = {
                            room: {
                                name: rooms[j].name,
                                place_nb: rooms[j].place_nb
                            },
                            subject: {
                                name: branch[i].subject.name,
                                prof: branch[i].subject.prof
                            },
                            branch: {
                                name: branch[i].branch_name,
                                effectif: branch[i].effectif
                            }
                        }
                        this.class_generated.push(tmp);
                        break;
                    }
                }
                if (j == rooms.length) {
                    ver = true;
                    break;
                }
            }
            if (ver == true) {
                for (let l = i; l < branch.length; l++) {
                    const tmp = {
                        room: {
                            name: "salle non disponible",
                            place_nb: 0
                        },
                        subject: {
                            name: branch[l].subject.name,
                            prof: branch[l].subject.prof
                        },
                        branch: {
                            name: branch[l].branch_name,
                            effectif: branch[l].effectif
                        }
                    }
                    this.class_generated.push(tmp);
                }
            }
            //#endregion

            return this.class_generated;
        } catch (error) {
            console.log(error);
        }
    }

    //#region AUTRE ALGO
    // public async generate(rooms: any, branch: any) {
    //     try {
    //         let classrooms = [];
    //         let rooms_percent = [];
    //         for (let i = 0; i < branch.length; i++) {
    //             let room = []
    //             for (let j = 0; j < rooms.length; j++) {
    //                 let tmp_percent = {}
    //                 if (rooms[j] >= branch[i]) {
    //                     let per = (100 * (rooms[j] - branch[i])) / rooms[j];
    //                     tmp_percent = {
    //                         percent: per
    //                     }
    //                 } else
    //                     tmp_percent = {
    //                         percent: -1
    //                     }
    //                 room.push(tmp_percent);
    //             }
    //             rooms_percent.push({ room: room });
    //         }
    //         console.log("ROOMS_Percent:");
    //         for (let i = 0; i < rooms_percent.length; i++) {
    //             console.log("rooms_percent[" + i + "]: ", rooms_percent[i]);
    //         }


    //         for (let i = 0; i < rooms_percent.length; i++) {
    //             console.log("i = ", i);

    //             let min_x = {
    //                 index: -1,
    //                 value: -1
    //             };
    //             for (let l = 0; l < rooms_percent[0].room.length; l++) {
    //                 if (rooms_percent[i].room[l].percent != -1) {
    //                     min_x = {
    //                         index: l,
    //                         value: rooms_percent[i].room[l].percent
    //                     }
    //                     break;
    //                 }
    //             }


    //             if (min_x.value != -1) {
    //                 let min_y = {
    //                     index: -1,
    //                     value: -1
    //                 };
    //                 let tab = [];
    //                 let verify = {
    //                     index: min_x.index,
    //                     value: false
    //                 };
    //                 while (verify.index < rooms_percent[0].room.length) {
    //                     console.log("verify.index: ", verify.index);
    //                     console.log('min_x:');
    //                     console.log(min_x);
    //                     for (let j = i; j < rooms_percent.length; j++) {
    //                         if (rooms_percent[j].room[verify.index].percent != -1 && j != min_y.index) {
    //                             let tmp = {
    //                                 index: j,
    //                                 value: rooms_percent[j].room[verify.index].percent
    //                             }
    //                             tab.push(tmp)
    //                         }
    //                     }
    //                     console.log('tab[' + i + ']:');
    //                     console.log(tab);

    //                     // min_y = Math.min(...tab);
    //                     min_y = this.min(tab);
    //                     console.log("min_y:");
    //                     console.log(min_y);


    //                     if (min_x.value == min_y.value) {
    //                         // const tmp = {
    //                         //     room: {
    //                         //         name: rooms[min_x.index].name,
    //                         //         place_nb: rooms[min_x.index].place_nb
    //                         //     },
    //                         //     branch: {
    //                         //         name: branch[i].branch_name,
    //                         //         effectif: branch[i].effectif
    //                         //     }
    //                         // }
    //                         const tmp = {
    //                             room: rooms[min_x.index],
    //                             branch: branch[i]
    //                         }
    //                         this.class_generated.push(tmp);
    //                         verify = {
    //                             index: rooms_percent[0].room.length * 2,
    //                             value: true
    //                         }
    //                     } else {
    //                         verify.index++;
    //                         if (verify.index < rooms_percent[0].room.length) {
    //                             min_x = {
    //                                 index: min_x.index + 1,
    //                                 value: rooms_percent[i].room[verify.index].percent
    //                             }
    //                             tab = [];
    //                         }

    //                     }
    //                 }
    //                 if (verify.index == rooms_percent[0].room.length && verify.value == false) {
    //                     // const tmp = {
    //                     //     room: {
    //                     //         name: 'salle non disponible',
    //                     //         place_nb: 0
    //                     //     },
    //                     //     branch: {
    //                     //         name: branch[i].branch_name,
    //                     //         effectif: branch[i].effectif
    //                     //     }
    //                     // }
    //                     const tmp = {
    //                         room: 'non disponible',
    //                         branch: branch[i]
    //                     }
    //                     this.class_generated.push(tmp);
    //                 }
    //             }
    //         }
    //         return this.class_generated;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // public min(tab: any) {
    //     let min = {
    //         index: tab[0].index,
    //         value: tab[0].value
    //     }
    //     for (let j = 1; j < tab.length; j++) {
    //         if (min.value > tab[j].value)
    //             min = {
    //                 index: tab[j].index,
    //                 value: tab[j].value
    //             }
    //     }
    //     return min;
    // }
    //#endregion
}