import { Customer, OrderStatus, Product } from '@prisma/client'

export function getRandomProduct(products: Product[]) {
  // Generate a random index within the array length
  const randomIndex = Math.floor(Math.random() * products.length)

  // Return the randomly selected object
  return products[randomIndex]
}

export function getRandomCustomer(customers: Customer[]) {
  // Generate a random index within the array length
  const randomIndex = Math.floor(Math.random() * customers.length)

  // Return the randomly selected object
  return customers[randomIndex]
}

export function getRandomDatePast4Months() {
  const currentDate = new Date() // Current date and time
  const currentTimestamp = currentDate.getTime() // Convert to timestamp

  // Calculate the timestamp for 4 months ago
  const fourMonthsAgoTimestamp = currentTimestamp - 1000 * 60 * 60 * 24 * 70 // 70 dias

  // Generate a random timestamp between four months ago and now
  const randomTimestamp =
    Math.random() * (currentTimestamp - fourMonthsAgoTimestamp) +
    fourMonthsAgoTimestamp

  // Create a new Date object from the random timestamp
  const randomDate = new Date(randomTimestamp)

  return randomDate
}

export function getRandomOrderState() {
  const options = [
    OrderStatus.delivered,
    OrderStatus.delivered,
    OrderStatus.delivered,
    OrderStatus.delivered,
    OrderStatus.delivering,
    OrderStatus.pending,
    OrderStatus.pending,
    OrderStatus.processing,
    OrderStatus.processing,
    OrderStatus.canceled,
  ]
  const randomIndex = Math.floor(Math.random() * options.length)
  return options[randomIndex]
}
