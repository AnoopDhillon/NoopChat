var Users = [
    {id: 123, name: 'Anoop'},
    {id: 234, name: 'Bnoop'},
    {id: 456, name: 'Cnoop'},
    {id: 678, name: 'Dnoop'}
];

Nicknames = [];

Nicknames.push(Users[0]);

console.log(Users[0]);
console.log(Users[0].id);
console.log(Users[0].id === 123);
if(Users[0].id === 123){
    console.log("Match!");
}

console.log(Nicknames[0]);