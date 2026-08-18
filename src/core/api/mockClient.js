import { appConfig } from "../../app/config/appConfig.js";

// Simulates real network latency + occasional failure so loading/error UI
// states are exercised the same way they would be against a live API.
export function wait(ms = appConfig.mockNetworkDelayMs) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockRequest(fn, { simulateErrorRate = 0 } = {}) {
  await wait();
  if (simulateErrorRate > 0 && Math.random() < simulateErrorRate) {
    throw { status: 500, message: "The service is temporarily unavailable. Please try again." };
  }
  return fn();
}
