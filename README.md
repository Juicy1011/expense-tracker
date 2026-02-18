A modern, full-stack expense tracking application designed to help you manage your finances with ease. Create budgets, track your spending, and visualize your financial activity through an intuitive and responsive dashboard.

## Features

-   **🔐 Secure User Authentication:** Seamless sign-up and sign-in functionality handled by Clerk, protecting all user data and routes.
-   **💰 Budget Management:** Easily create custom budgets with names, amounts, and personalized emoji icons. You can also edit and delete budgets as needed.
-   **💸 Expense Tracking:** Add expenses to your budgets, with automatic validation to ensure you don't exceed your budget limit.
-   **📊 Interactive Dashboard:** A central hub displaying key financial metrics like total budget, total spending, and an activity bar chart to visualize your financial data.
-   **📝 Expense History:** View a detailed list of all your expenses, with the ability to delete entries.
-   **🎨 Modern UI/UX:** Built with Tailwind CSS and shadcn/ui for a clean, responsive, and accessible user experience, enhanced with smooth animations from Framer Motion.
-   **🔔 Real-time Notifications:** Get instant feedback for your actions, such as creating a budget or adding an expense, through Sonner toast notifications.

## Tech Stack

-   **Framework:** Next.js (App Router)
-   **Authentication:** Clerk
-   **Database:** Neon (Serverless Postgres)
-   **ORM:** Drizzle ORM
-   **Styling:** Tailwind CSS
-   **UI Components:** shadcn/ui
-   **Data Visualization:** Recharts
-   **Animations:** Framer Motion
-   **Notifications:** Sonner

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm
-   A [Clerk](https://clerk.com/) account for authentication keys.
-   A [Neon](https://neon.tech/) account for a serverless Postgres database.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/juicy1011/expense-tracker.git
    cd expense-tracker
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of your project and add the following environment variables. Replace the placeholder values with your actual credentials from Clerk and Neon.

 

4.  **Sync Database Schema:**
    Run the following Drizzle Kit command to push the schema defined in `db/schema.ts` to your Neon database.

    ```bash
    npx drizzle-kit push:pg
    ```

5.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

The project follows a feature-driven structure within the Next.js App Router.

-   `app/`: Main application directory.
    -   `/(auth)`: Route group for authentication pages (Sign In/Sign Up) handled by Clerk.
    -   `/(routes)`: Route group for protected application routes (Dashboard, Budgets, Expenses).
    -   `/_components`: Reusable components for the landing page (Header, Hero, Footer).
-   `components/ui/`: UI components from shadcn/ui (Button, Dialog, Input, etc.).
-   `db/`: Contains the Drizzle database configuration (`dbConfig.jsx`) and schema definition (`schema.ts`).
-   `lib/`: Shared utility functions.
-   `drizzle.config.ts`: Configuration file for Drizzle Kit, pointing to the database schema and credentials.
-   `middleware.ts`: Implements Clerk authentication to protect application routes.
