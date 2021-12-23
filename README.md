# busee
![ci](https://github.com/desirekaleba/busee/actions/workflows/ci.yaml/badge.svg)
![codeQL](https://github.com/desirekaleba/busee/actions/workflows/codeql-analysis.yml/badge.svg)
> Online Bus Booking System REST API
### Features
1. User can Sign up
2. User can Sign in
3. Admin can create a trip
4. Admin can cancel a trip
5. Both admin and users can see all trips
6. Both admin and users can see a specific trip
7. Users can book a seat on a trip
8. View all bookings. And admin can see all bookings, while a user can see all of his/her bookings
9. Users can delete their bookings
10. Users can get a list of filtered trips based on origin
11. Users can get a list of filtered trips based on destination
12. Users can specify their seat numbers when making a booking

### Tech stacks and tools
#### Backend
- Node/Express/Typescript: Server
- Mysql: Primary Storage
- TypeORM: Object-relational Mapper
- AWS S3: Blob Storage
- Stripe: Payment
- Twilio/SendGrid: Email service
#### Common
- ESLint
- Jest
- GitHub actions

### Getting Started
You can either fork this repository or Clone It by opening your terminal, navigating where you want to save it and run
```sh
git clone https://github.com/desirekaleba/busee.git
```
Enter the project folder
```sh
cd busee
```
Rename the file `.env.example` to `.env` and update the variable values with valid ones.

You can set up the project with
```sh
npm install
```
And run it with
1.Development
```sh
npm run start:dev
```
2. Production
```sh
npm run build && npm start
```
3. Or run test suits with
```sh
npm test
```
You can as well check for linting erros with
```sh
npm run lint
```
Or format errors with
```sh
npm run format:check
```

### License
See the [LICENSE](https://github.com/desirekaleba/busee/blob/main/LICENSE).

PS: **Project still under development...**
