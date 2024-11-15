export const registerUser = async ({
  email,
  password,
  firstname,
  lastname
}) => {
  const body = { email, password, firstname, lastname }

  try {
    const res = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const data = await res.json()

    return data.token
  } catch (error) {
    console.log(error.message)
  }
}

export const loginUser = async ({ email, password }) => {
  const body = { email, password }

  try {
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const data = await res.json()

    return data.token
  } catch (error) {
    console.log(error.message)
  }
}
