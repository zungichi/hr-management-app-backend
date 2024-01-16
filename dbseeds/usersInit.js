module.exports.user_role = [
    'admin',
    'user'
]

module.exports.position = [
    {
        level: 1,
        position_name: 'Staff'
    },
    {
        level: 2,
        position_name: 'Senior Staff'
    },
    {
        level: 3,
        position_name: 'Assistant Manager'
    },
    {
        level: 4,
        position_name: 'Manager'
    },
    {
        level: 5,
        position_name: 'General Manager'
    },
    {
        level: 6,
        position_name: 'Vice President'
    },
    {
        level: 7,
        position_name: 'President'
    }
]

module.exports.department = [
    'Software',
    'Electronic',
    'Production',
    'Accounting',
    'Quality',
    'Human Resource'
]

module.exports.adminInfo = [
    {
        usercode: '0000',
        firstname: 'Zung',
        lastname: 'Zung',
        phone: randomPhone(),
        birthdate: randomDate(new Date(1950, 0, 1), new Date()),
        level: 5,
        department: 'Human Resource',
        approver: 'Peter'
    },
    {
        usercode: '0001',
        firstname: 'Aum',
        lastname: 'Aum',
        phone: randomPhone(),
        birthdate: randomDate(new Date(1950, 0, 1), new Date()),
        level: 5,
        department: 'Human Resource',
        approver: 'Peter'
    }
]

module.exports.employee = [
    {
        usercode: randomUsercode(),
        firstname: 'Steve',
        lastname: 'Rogers',
        phone: randomPhone(),
        birthdate: randomDate(new Date(1950, 0, 1), new Date()),
        level: 1,
        department: 'Software',
        approver: 'Natasha'
    },
    {
        usercode: randomUsercode(),
        firstname: 'Tony',
        lastname: 'Stark',
        phone: randomPhone(),
        birthdate: randomDate(new Date(1950, 0, 1), new Date()),
        level: 2,
        department: 'Software',
        approver: 'Natasha'
    },
    {
        usercode: randomUsercode(),
        firstname: 'Bruce',
        lastname: 'Banner',
        phone: randomPhone(),
        birthdate: randomDate(new Date(1950, 0, 1), new Date()),
        level: 3,
        department: 'Software',
        approver: 'Natasha'
    },
    {
        usercode: randomUsercode(),
        firstname: 'Natasha',
        lastname: 'Romanoff',
        phone: randomPhone(),
        birthdate: randomDate(new Date(1950, 0, 1), new Date()),
        level: 4,
        department: 'Software',
        approver: 'Peter'
    },
    {
        usercode: randomUsercode(),
        firstname: 'John',
        lastname: 'Wick',
        phone: randomPhone(),
        birthdate: randomDate(new Date(1950, 0, 1), new Date()),
        level: 1,
        department: 'Production',
        approver: 'Thor'
    },
    {
        usercode: randomUsercode(),
        firstname: 'Arya',
        lastname: 'Stark',
        phone: randomPhone(),
        birthdate: randomDate(new Date(1950, 0, 1), new Date()),
        level: 2,
        department: 'Production',
        approver: 'Thor'
    },
    {
        usercode: randomUsercode(),
        firstname: 'Jon',
        lastname: 'Snow',
        phone: randomPhone(),
        birthdate: randomDate(new Date(1950, 0, 1), new Date()),
        level: 3,
        department: 'Production',
        approver: 'Thor'
    },
    {
        usercode: randomUsercode(),
        firstname: 'Thor',
        lastname: 'Odinson',
        phone: randomPhone(),
        birthdate: randomDate(new Date(1950, 0, 1), new Date()),
        level: 4,
        department: 'Production',
        approver: 'Peter'
    },
    {
        usercode: randomUsercode(),
        firstname: 'Peter',
        lastname: 'Parker',
        phone: randomPhone(),
        birthdate: randomDate(new Date(1950, 0, 1), new Date()),
        level: 6,
        department: null,
        approver: 'Jane'
    },
    {
        usercode: randomUsercode(),
        firstname: 'Jane',
        lastname: 'Doe',
        phone: randomPhone(),
        birthdate: randomDate(new Date(1950, 0, 1), new Date()),
        level: 7,
        department: null,
        approver: 'Jane'
    },
]

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().slice(0,10);
}

function randomPhone() {
    const prefix = '+668';
    const num = Math.floor(Math.random() * 100000000)
    return prefix + num.toString().padStart(8, '0');
}

function randomUsercode() {
    return Math.floor(Math.random() * 10000).toString().padStart(4, '0');
}