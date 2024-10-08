import { config } from 'dotenv'

config({ path: './config.env' })

export const DEVELOPMENT_MODE = process.env.DEVELOPMENT_MODE ;

export const FRONTENDURL=process.env.FRONTEND_PORT;


export function timeGenerator() {
    const now = new Date();

    // Get individual date components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    // Format as YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
    return { formattedDate, year, month, day }
}