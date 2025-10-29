function formatDate(date: string | Date): Date {
  const d = new Date(date).toISOString().split("T")[0];

  return new Date(d);
}

export { formatDate };
