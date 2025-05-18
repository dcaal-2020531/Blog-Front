import React from 'react'

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    color: '#333',
    fontSize: '2rem',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    userSelect: 'none',
  }
}

export const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      Página No Encontrada
    </div>
  )
}
