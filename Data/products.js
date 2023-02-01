const products = [
  {
    name: 'Black Yoga Mat',
    image: '/ZingImages/YogaCategory/blackmat.jpeg',
    description:
      'Exercise mat for yoga, pilates, and other workout routines' +
      'Textured surface for enhanced traction' +
      ' 1/2-inch, extra-thick yoga mat for comfortable, cushioning support' +
      ' Made of lightweight, durable foam  ' +
      'Measures approximately 74 x 24 x 0.5 inches (LxWxH)',

    brand: 'Zing Vibes',
    category: 'Sports and Recreation',
    slug: 'Sports and Recreation',
    price: 14.99,
    countInStock: 20,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Blue Yoga Mat',
    image: '/ZingImages/YogaCategory/bluemat.jpeg',
    description:
      'Exercise mat for yoga, pilates, and other workout routines' +
      'Textured surface for enhanced traction' +
      ' 1/2-inch, extra-thick yoga mat for comfortable, cushioning support' +
      ' Made of lightweight, durable foam  ' +
      'Measures approximately 74 x 24 x 0.5 inches (LxWxH)',

    brand: 'Yoga',
    category: 'Sports and Recreation',
    slug: 'Sports and Recreation',
    price: 14.99,
    countInStock: 20,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Grey Yoga Mat',
    image: '/ZingImages/YogaCategory/greymat.jpeg',
    description:
      'Exercise mat for yoga, pilates, and other workout routines' +
      'Textured surface for enhanced traction' +
      ' 1/2-inch, extra-thick yoga mat for comfortable, cushioning support' +
      ' Made of lightweight, durable foam  ' +
      'Measures approximately 74 x 24 x 0.5 inches (LxWxH)',

    brand: 'Zing Vibes',
    category: 'Sports and Recreation',
    slug: 'Sports and Recreation',
    price: 14.99,
    countInStock: 20,
    rating: 3,
    numReviews: 12,
  },
  {
    name: 'Pink Yoga Mat',
    image: '/ZingImages/YogaCategory/pinkmat.jpeg',
    description:
      'Exercise mat for yoga, pilates, and other workout routines' +
      'Textured surface for enhanced traction' +
      ' 1/2-inch, extra-thick yoga mat for comfortable, cushioning support' +
      ' Made of lightweight, durable foam  ' +
      'Measures approximately 74 x 24 x 0.5 inches (LxWxH)',
    brand: 'Zing Vibes',
    category: 'Sports and Recreation',
    slug: 'Sports and Recreation',
    price: 14.99,
    countInStock: 20,
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'Purple Yoga Mat',
    image: '/ZingImages/YogaCategory/purplemat2.jpeg',
    description:
      'Exercise mat for yoga, pilates, and other workout routines' +
      'Textured surface for enhanced traction' +
      ' 1/2-inch, extra-thick yoga mat for comfortable, cushioning support' +
      ' Made of lightweight, durable foam  ' +
      'Measures approximately 74 x 24 x 0.5 inches (LxWxH)',
    brand: 'Zing Vibes',
    category: 'Sports and Recreation',
    slug: 'Sports and Recreation',
    price: 14.99,
    countInStock: 50,
    rating: 4,
    numReviews: 12,
  },

  {
    name: 'Posture Corrector Adjustable Belt',
    image: '/ZingImages/Wellness/BackPostureCorrector.jpg',
    description:
      'Easily get perfect confident posture - start standing' +
      'sitting much straighter. Align your shoulders, spine,' +
      'and upper back. Improve posture & reduce slouching immediately' +
      'with an easily adjustable dual strap design. A lightweight' +
      'padded neoprene corrector can be worn comfortably under or over' +
      'the clothing. Eliminates neck and back discomfort from sitting with rounded shoulders in front of the computer.',

    brand: 'Zing Vibes',
    category: 'Wellness',
    slug: 'Wellness',
    price: 24.99,
    countInStock: 1200,
    rating: 4.5,
    numReviews: 30,
  },
  {
    id: '7',
    name: 'Shoulder Corrector Adjustable',
    image: '/ZingImages/Wellness/shouldercorrector.jpg',
    description:
      'Easily get perfect confident posture - start standing' +
      'sitting much straighter. Align your shoulders, spine,' +
      'and upper back. Improve posture & reduce slouching immediately' +
      'with an easily adjustable dual strap design. A lightweight' +
      'padded neoprene corrector can be worn comfortably under or over' +
      'the clothing. Eliminates neck and back discomfort from sitting with rounded shoulders in front of the computer.',

    brand: 'Zing Vibes',
    category: 'Wellness',
    slug: 'Wellness',
    price: 14.99,
    countInStock: 20,
    rating: 4.0,
    numReviews: 40,
  },
  {
    name:
      'Foot Massage Pad Chinese Health Care Reflexology Walk Stone Pain Reliever',
    image: '/ZingImages/Wellness/footmat.jpg',
    description:
      'The foot massage mat with high-quality material is soft' +
      'and durable for human use. The foot reflex point theory is' +
      'that pain is not often painful. Use this PAD to expel blood' +
      'circulation pain.',
    brand: 'Zing Vibes',
    category: 'Wellness',
    slug: 'Wellness',
    price: 35.99,
    countInStock: 1000,
    rating: 4.3,
    numReviews: 50,
  },
  {
    name:
      'Knee Brace Support Wrap Massager Infrared Heating Hot Therapy Arthritis',
    image: '/ZingImages/Wellness/KneeBelt.jpg',
    description:
      'Easily get perfect confident posture - start standing' +
      'sitting much straighter. Align your shoulders, spine,' +
      'and upper back. Improve posture & reduce slouching immediately' +
      'with an easily adjustable dual strap design. A lightweight' +
      'padded neoprene corrector can be worn comfortably under or over' +
      'the clothing. Eliminates neck and back discomfort from sitting with rounded shoulders in front of the computer.',

    brand: 'Zing Vibes',
    category: 'Wellness',
    slug: 'Wellness',
    price: 27.99,
    countInStock: 999,
    rating: 4.7,
    numReviews: 100,
  },
  {
    name:
      'Massage Back Strecher Equipment Magic Stretch Fitness Lumbar Support Relaxation Spine Pain Relief Corrector Health ',
    image: '/ZingImages/Wellness/BackAdjustment.jpg',
    description:
      'Easily get perfect confident posture - start standing' +
      'sitting much straighter. Align your shoulders, spine,' +
      'and upper back. Improve posture & reduce slouching immediately' +
      'with an easily adjustable dual strap design. A lightweight' +
      'padded neoprene corrector can be worn comfortably under or over' +
      'the clothing. Eliminates neck and back discomfort from sitting with rounded shoulders in front of the computer.',
    brand: 'Zing Vibes',
    category: 'Wellness',
    slug: 'Wellness',
    price: 34.99,
    countInStock: 30,
    rating: 4.0,
    numReviews: 150,
  },
]

export default products
