import React, { useState } from "react";

type queueName =
    'import-product' |
    'send-email'

export interface QueueProgress {
    id: string;
    progress: number;
    result?: string;
    title: string;
    description?: string;
    show: boolean;
    status: 'start'| 'pending'| 'success'| 'error';
    name: queueName
}

export interface ResponseQueueProgress {
    queues: QueueProgress[];
    addQueue: (queue: QueueProgress) => void;
    setQueues: (e: QueueProgress[]) => void;
    removeQueue: (queueID: string) => void;
    updatedQueue: (queueID: string, queueUpdated: QueueProgress) => void;
}

export const useQueueProgress = () => {
    const [queues, setQueues] = useState<QueueProgress[]>([])

    const addQueue = ( queue: QueueProgress ) => {
        setQueues(prevQueues => [...prevQueues, queue])
    }

    const removeQueue = (queueID: string) => {
        setQueues(prevQueues => prevQueues.filter((queue) => queue.id !== queueID))
    }

    const updatedQueue = (queueID: string, queueUpdated: QueueProgress) => {

        setQueues(prevQueues => {
            const updatedQueues = prevQueues.map(queue => {
                if (queue.id == queueID) {
                    return { ...queue, ...queueUpdated };
                }
                return queue;
            })
            return updatedQueues;
        })

    }

    return {
        queues,
        addQueue,
        setQueues,
        removeQueue,
        updatedQueue
    }
}
