export const generateUniqueID = () => {
    const timestamp = new Date().getTime(); // Get current timestamp
    const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number

    // Combine timestamp and random number to create a unique ID
    const uniqueID = `${timestamp}-${randomNum}`;

    return uniqueID;
}