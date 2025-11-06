import { connection } from "../connection";

import {
  selectCountOfUsersTemplate,
  selectUsersTemplate,
  selectUserTemplate,
} from "./query-templates";
import { User } from "./types";

export const getUsersCount = (): Promise<number> =>
  new Promise((resolve, reject) => {
    connection.get<{ count: number }>(
      selectCountOfUsersTemplate,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.count);
      }
    );
  });

export const getUsers = (
  pageNumber: number,
  pageSize: number
): Promise<User[]> =>
  new Promise((resolve, reject) => {
    connection.all<User>(
      selectUsersTemplate,
      [pageNumber * pageSize, pageSize],
      (error, results) => {
        if (error) {
          reject(error);
        }
        results.forEach((user) => {
          if (user.street && user.city && user.state && user.zipcode) {
            user.address = `${user.street}, ${user.state}, ${user.city}, ${user.zipcode}`;
          } else {
            user.address = "No address provided";
          }
        });
        resolve(results);
      }
    );
  });

export const getUserById = (id: number): Promise<User | null> =>
  new Promise((resolve, reject) => {
    connection.get<User>(selectUserTemplate, id, (error, result) => {
      if (error) {
        reject(error);
      }
      if (!result) {
        resolve(null);
        return null;
      }
      resolve(result);
    });
  });