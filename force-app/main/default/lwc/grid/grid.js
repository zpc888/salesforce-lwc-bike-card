import { LightningElement } from 'lwc';
import { bikes } from 'c/data';

// const columns = [
//     { label: 'ID', fieldName: 'Id', type: 'text' },
//     { label: 'Category', fieldName: 'Category__c', type: 'text' },
//     { label: 'Name', fieldName: 'Name', type: 'text' },
//     { label: 'Description', fieldName: 'Description__c', type: 'text' },
//     { label: 'Level', fieldName: 'Level__c', type: 'text' },
//     { label: 'Material', fieldName: 'Material__c', type: 'text' },
//     { label: 'MSRP', fieldName: 'MSRP__c', type: 'currency', sortable: true, cellAttributes: { alignments: 'left'} },
//     { label: 'CreatedDate', fieldName: 'CreatedDate', type: 'date' }
// ];

const data = [
    { id: 1, name: 'Billy Simonns', age: 40, email: 'billy@salesforce.com' },
    { id: 2, name: 'Kelsey Denesik', age: 35, email: 'kelsey@salesforce.com' },
    { id: 3, name: 'Kyle Ruecker', age: 50, email: 'kyle@salesforce.com' },
    {
        id: 4,
        name: 'Krystina Kerluke',
        age: 37,
        email: 'krystina@salesforce.com',
    },
];

const columns = [
    { label: 'Name', fieldName: 'name' },
    {
        label: 'Age',
        fieldName: 'age',
        type: 'number',
        sortable: true,
        cellAttributes: { alignment: 'left' },
    },
    { label: 'Email', fieldName: 'email', type: 'email' },
];

export default class Grid extends LightningElement {
    /*
    bikes = bikes.map(b => b.fields).map(f => {
        const ret = {};
        for (const k in f) {
            ret[k] = f[k].value;
        }
        return ret;
    });
    columns = columns;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;

    sortBy(field, reverse, primer) {
        const key = primer ? function(x) {
            return primer([x[field]]);
        } : function(x) {
            return x[field];
        };
        return (a, b) => {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    onHandleSort(event) {
        const { field: sortedBy, sortDirection } = event.details;
        const cloneData = [...this.bikes];
        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.bikes = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }
    */

    data = data;
    columns = columns;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;

    // Used to sort the 'Age' column
    sortBy(field, reverse, primer) {
        const key = primer
            ? function (x) {
                  return primer(x[field]);
              }
            : function (x) {
                  return x[field];
              };

        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    onHandleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData = [...this.data];

        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.data = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }    
}