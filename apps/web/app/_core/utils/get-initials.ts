export const getInitials = (firstName: string, lastName: string): string => {
  // Extract the first letter of each name and convert it to uppercase
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  return initials;
};