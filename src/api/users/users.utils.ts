import { RandomUser, RandomUserResponse } from "./users.types";

export interface UserMetrics {
  total: number;
  newUsers: number;
  topUsersAge: number;
  otherUsers: number;
  topCountry: { name: string; count: number } | null;
  maleCount: number;
  femaleCount: number;
}

export const calculateUserMetrics = (data: RandomUserResponse): UserMetrics => {
  if (!data?.results?.length) {
    return {
      total: 0,
      newUsers: 0,
      topUsersAge: 0,
      otherUsers: 0,
      topCountry: null,
      maleCount: 0,
      femaleCount: 0,
    };
  }

  const users = data.results;
  const total = users.length;

  let newUsers = 0;
  let topUsersAge = 0;
  let otherUsers = 0;
  let maleCount = 0;
  let femaleCount = 0;

  const countryCount: Record<string, number> = {};

  for (const user of users) {
    const { registered, dob, gender, location } = user;

    if (gender === "male") maleCount++;
    else if (gender === "female") femaleCount++;

    if (registered.age >= 31) newUsers++;
    else if (dob.age >= 65) topUsersAge++;
    else otherUsers++;

    const country = location?.country || "Unknown";
    countryCount[country] = (countryCount[country] || 0) + 1;
  }

  let topCountryName = "Unknown";
  let topCountryCount = 0;

  for (const [country, count] of Object.entries(countryCount)) {
    if (count > topCountryCount) {
      topCountryName = country;
      topCountryCount = count;
    }
  }

  const topCountry = topCountryCount > 0 ? { name: topCountryName, count: topCountryCount } : null;

  return {
    total,
    newUsers,
    topUsersAge,
    otherUsers,
    topCountry,
    maleCount,
    femaleCount,
  };
};

export interface TableUser {
  id: string;
  name: string;
  gender: string;
  email: string;
  dateBirthday: string;
  country: string;
  cellphone: string;
  picture: string;
  favorite: boolean;
  isPlaceholder?: boolean;
}

export const tableInformationUsers = (results: RandomUser[]): TableUser[] => {
  if (!results) return [];
  return results.map((r, i) => ({
    id: r.login?.uuid ?? String(i),
    name: `${r.name?.first ?? ""} ${r.name?.last ?? ""}`.trim(),
    gender: r.gender ?? "",
    email: r.email ?? "",
    dateBirthday: r.dob?.date ? new Date(r.dob.date).toLocaleDateString() : "",
    country: r.location?.country ?? "",
    cellphone: r.cell ?? "",
    picture: r.picture?.thumbnail ?? "",
    favorite: false,
  }));
};
