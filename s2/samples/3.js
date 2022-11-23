try {
  console.log('before error')
  throw new Error('some error')
  console.log('after error')
} catch (error) {
  console.log(error)
} finally {
  console.log('i always run')
}