import Task from './todo.interface';


function data(): Task[] {

    const data: Task[] = [
        {
            id: '1',
            description: "Terminer le cours de Javascript en ligne",
            isCompleted: false,
            index: 1
        },
        {
            id: '2',
            description: "Faire du jogging dans le parc *3",
            isCompleted: true,
            index: 2
        },
        {
            id: '3',
            description: "deux minutes de méditation",
            isCompleted: false,
            index: 3
        },
        {
            id: '4',
            description: "Lire pendant 1 heure",
            isCompleted: false,
            index: 4
        },
        {
            id: '5',
            description: "Ramasser les courses",
            isCompleted: true,
            index: 5
        }
    ]

    return data;
}

export default data;