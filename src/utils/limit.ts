interface Options {
  concurrencyLimit: number
  progressCallback: (progress: number) => void
}

type Task<T> = () => Promise<T>

export async function limit<T>(
  tasks: Task<T>[],
  { concurrencyLimit, progressCallback }: Options,
): Promise<T[]> {
  const results: T[] = []
  const totalTasks = tasks.length
  let completedTasks = 0

  async function runTasks(tasksIterator: IterableIterator<[number, Task<T>]>) {
    for (const [index, task] of tasksIterator) {
      results[index] = await task()
      completedTasks++
      progressCallback(completedTasks / totalTasks)
    }
  }

  const workers = new Array(concurrencyLimit)
    .fill(tasks.entries())
    .map(runTasks)

  await Promise.allSettled(workers)

  return results
}
