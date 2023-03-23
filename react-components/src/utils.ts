export function getAge(dateOfBirth: Date): number {
  const now: Date = new Date();
  const month: number = now.getMonth() - dateOfBirth.getMonth();
  let age: number = now.getFullYear() - dateOfBirth.getFullYear();
  if (month < 0 || (month === 0 && now.getDate() < dateOfBirth.getDate())) {
    age--;
  }
  return age;
}
