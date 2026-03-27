use std::thread;

use crate::worker::Worker;
mod worker;

pub struct ThreadPool {
    workers: Vec<Worker>,
}

impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        let mut workers = Vec::with_capacity(size);
        for id in 0..size {
            let w = Worker::new(id);
            workers.push(w);
        }

        ThreadPool { workers }
    }
    pub fn execute<F, T>(&self, f: F)
    where
        F: FnOnce() -> T,
        F: FnOnce() + Send + 'static,
        T: Send + 'static,
    {
    }
}
