'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'drakor_favorites';
const EVENT_NAME = 'favorites-updated';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadFromStorage();

    const handleStorageChange = () => {
      loadFromStorage();
    };

    window.addEventListener(EVENT_NAME, handleStorageChange);
    // Also listen for cross-tab updates
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(EVENT_NAME, handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const saveToStorage = (newFavorites) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event(EVENT_NAME));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const toggleFavorite = (item) => {
    // Re-read current state to ensure we have latest data before toggling
    // This handles edge cases where state might be stale in closure
    const currentStored = localStorage.getItem(STORAGE_KEY);
    const currentFavorites = currentStored ? JSON.parse(currentStored) : [];
    
    const exists = currentFavorites.some((fav) => fav.book_id === item.book_id);
    let newFavorites;
    
    if (exists) {
        newFavorites = currentFavorites.filter((fav) => fav.book_id !== item.book_id);
    } else {
        newFavorites = [...currentFavorites, item];
    }

    setFavorites(newFavorites); // Optimistic update
    saveToStorage(newFavorites);
  };

  const removeFavorite = (bookId) => {
    // Re-read current state
    const currentStored = localStorage.getItem(STORAGE_KEY);
    const currentFavorites = currentStored ? JSON.parse(currentStored) : [];

    const newFavorites = currentFavorites.filter((fav) => fav.book_id !== bookId);
    setFavorites(newFavorites);
    saveToStorage(newFavorites);
  };

  const isFavorite = (bookId) => {
    return favorites.some((fav) => fav.book_id === bookId);
  };

  return {
    favorites,
    toggleFavorite,
    removeFavorite,
    isFavorite,
    isLoaded
  };
}
