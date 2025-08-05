# Code Coverage Analysis Project

A React TypeScript application demonstrating comprehensive code coverage analysis with three interconnected components and extensive unit testing.

## Features

- **Three Main Components**: Home, Products, and About pages with navigation
- **Dummy Data**: Rich sample data for users, products, and company information
- **Navigation**: Button-based navigation between pages using React Router
- **Comprehensive Testing**: Extensive unit tests with high coverage
- **Modern UI**: Beautiful, responsive design with CSS Grid and Flexbox
- **TypeScript**: Full TypeScript support with proper type definitions

## Project Structure

```
src/
├── components/
│   ├── Home.tsx          # Home page with user data
│   ├── Home.test.tsx     # Home component tests
│   ├── Products.tsx      # Products page with filtering
│   ├── Products.test.tsx # Products component tests
│   ├── About.tsx         # About page with team data
│   └── About.test.tsx    # About component tests
├── App.tsx               # Main app with routing
├── App.test.tsx          # App component tests
├── App.css               # Comprehensive styling
└── index.tsx             # App entry point
```

## Components Overview

### Home Component
- Displays user information with dummy data
- Navigation buttons to Products and About pages
- User cards with name, email, and role information

### Products Component
- Product catalog with filtering by category
- Product cards showing price, category, and stock status
- Interactive category filter buttons
- Navigation to Home and About pages

### About Component
- Company statistics with visual cards
- Team member information with experience levels
- Company mission statement
- Navigation to Home and Products pages

## Dummy Data

### Users (Home Page)
- 4 sample users with different roles (Admin, User, Moderator)
- Each user has name, email, and role information

### Products (Products Page)
- 8 products across 3 categories (Electronics, Kitchen, Clothing)
- Products include price, category, and stock status
- Some products marked as "out of stock"

### Company Data (About Page)
- 4 company statistics (Years in Business, Team Members, etc.)
- 6 team members with positions, departments, and experience
- Experience levels calculated automatically (Senior, Mid-level, Junior)

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd code-coverage-analysis
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Testing

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm run coverage
```

### Run Tests with Coverage (Alternative)
```bash
npm run test:coverage
```

## Coverage Analysis

The project includes comprehensive test coverage for:

- **Statements**: Code execution paths
- **Branches**: Conditional logic (if/else statements)
- **Functions**: Function definitions and calls
- **Lines**: Individual lines of code

### Coverage Thresholds
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

### Test Coverage Areas

#### Home Component Tests
- Component rendering
- Navigation functionality
- User data display
- Button interactions
- Component structure validation

#### Products Component Tests
- Component rendering
- Navigation functionality
- Product filtering by category
- Product data display
- Stock status styling
- Interactive elements

#### About Component Tests
- Component rendering
- Navigation functionality
- Company statistics display
- Team member information
- Experience level calculations
- Mission statement display

#### App Component Tests
- Routing setup
- Default page rendering
- Component integration

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage (watch mode disabled)
- `npm run coverage` - Run tests with coverage and generate reports
- `npm run eject` - Eject from Create React App (irreversible)

## Coverage Reports

When running coverage, the following reports are generated:

1. **Console Output**: Summary in terminal
2. **HTML Report**: Detailed coverage in `coverage/lcov-report/index.html`
3. **LCOV Report**: Coverage data in `coverage/lcov.info`

## Technologies Used

- **React 19.1.1** - UI library
- **TypeScript 4.9.5** - Type safety
- **React Router DOM** - Navigation
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **User Event** - User interaction testing

## Expected Coverage Output

When running `npm run coverage`, you should see output similar to:

```
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |   95.24 |    92.31 |   100.00 |   95.24 |                  
 App.tsx  |   100.00 |    100.00 |   100.00 |  100.00 |                  
 Home.tsx |   100.00 |    100.00 |   100.00 |  100.00 |                  
Products.tsx| 100.00 |    100.00 |   100.00 |  100.00 |                  
 About.tsx|   100.00 |    100.00 |   100.00 |  100.00 |                  
----------|---------|----------|---------|---------|-------------------
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass with coverage above 80%
6. Submit a pull request

## License

This project is licensed under the MIT License.
