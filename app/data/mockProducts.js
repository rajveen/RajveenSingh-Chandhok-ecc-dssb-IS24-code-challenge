import { faker } from '@faker-js/faker';

function createRandomProduct() {
    return {
        productId: faker.string.uuid(),
        productName: faker.company.name(),
        productOwnerName: faker.person.fullName(),
        developers: [
            faker.person.fullName(),
            faker.person.fullName(),
            faker.person.fullName(),
            faker.person.fullName(),
            faker.person.fullName(),
        ],
        scrumMasterName: faker.person.fullName(),
        startDate: faker.date.past({ years: 5 }),
        methodology: faker.helpers.arrayElement(['Agile', 'Waterfall']),
        location: faker.internet.url({ appendSlash: true }),
    };
}

let products = faker.helpers.multiple(createRandomProduct, { count: 5 });


export default function getMockProducts() {
    return products;
}

