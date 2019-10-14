import { sleep } from "./helpers"

const availableResidences = [
  {
    id: 'almost_blue',
    title: 'Almost Blue',
    address: '064 Blick Dam',
    price: 650000,
    rating: 4.7,
    imageSrc: '/static/almost_blue.jpg',
  },
  {
    id: 'cancun_residence',
    title: 'Cancun Residence',
    address: '8912 Karlie Walk',
    price: 875000,
    rating: 4.5,
    imageSrc: '/static/cancun_residence.jpg',
  },
  {
    id: 'classic_family',
    title: 'Classic Family',
    address: '22179 Christopher Throughway',
    price: 410000,
    rating: 3.9,
    imageSrc: '/static/classic_family.jpg',
  },
  {
    id: 'family_cabin',
    title: 'Family Cabin',
    address: '79881 Dickens Cliffs',
    price: 424000,
    rating: 4.32,
    imageSrc: '/static/family_cabin.jpg',
  },
  {
    id: 'family_mansion',
    title: 'Family Mansion',
    address: '351 Matteo Vista',
    price: 687000,
    rating: 4.5,
    imageSrc: '/static/family_mansion.jpg',
  },
  {
    id: 'fancy_blue',
    title: 'Fancy Blue',
    address: '67620 Rutherford Pike',
    price: 650000,
    rating: 4.9,
    imageSrc: '/static/fancy_blue.jpg',
  },
  {
    id: 'little_villa',
    title: 'Little Villa',
    address: '8821 Hansen Mission',
    price: 768000,
    rating: 4.8,
    imageSrc: '/static/little_villa.jpg',
  },
  {
    id: 'modern_european',
    title: 'Modern European',
    address: '92548 Pouros Drive',
    price: 854000,
    rating: 4.9,
    imageSrc: '/static/modern_european.jpg',
  },
  {
    id: 'modern_scandinavian',
    title: 'ModernScandinavian',
    address: '0793 Abbott Fork',
    price: 798000,
    rating: 4.85,
    imageSrc: '/static/modern_scandinavian.jpg',
  },
  {
    id: 'modern_tiny',
    title: 'Modern Tiny',
    address: '4110 Rafael View',
    price: 678000,
    rating: 3.97,
    imageSrc: '/static/modern_tiny.jpg',
  },
  {
    id: 'purple_lady',
    title: 'Purple Lady',
    address: '24152 Eleanore Square',
    price: 375000,
    rating: 4.12,
    imageSrc: '/static/purple_lady.jpg',
  },
  {
    id: 'smart_and_neat',
    title: 'Smart And Neat',
    address: '511 Swaniawski Forest',
    price: 368000,
    rating: 4.0,
    imageSrc: '/static/smart_and_neat.jpg',
  },
]

export function getResidinces(priceLimit) {
  return sleep(Math.random() * 1000 + 300)
    .then(() => {
      const results = _(availableResidences)
        .filter((residence) => residence.price <= priceLimit)
        .shuffle()
        .value()
      return results
    })
}
