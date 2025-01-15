import { Card, CardActionArea, CardContent, LinearProgress } from '@mui/material'
import { Button, Progress } from 'antd'
import React from 'react'
import { QueueProgress as QueueProgressModel } from '../../hooks/useQueueProgress';
import { useAppContext } from '../../contexts/AppContext';
import { CheckCircleOutline, CloseOutlined, HighlightOff } from '@mui/icons-material';

interface Props extends QueueProgressModel {

}

export default function QueueProgress({
    progress,
    title,
    description,
    status,
    id
}: QueueProgressModel) {
    const { queueProgressApp } = useAppContext()

    return (
        <Card className="fixed top-5 right-10 w-[300px] duration-1000 scale-100 max-w-md z-[100]">
            <CardContent className="space-y-0">
                <p className='font-bold text-lg m-0 text-center'>{title}</p>
                <div className='text-center'>
                    {
                        progress >= 100 ? (
                            status === 'success' ? (
                                <CheckCircleOutline sx={{ fontSize: 72 }} color={'success'} />
                            ) : (
                                <HighlightOff sx={{ fontSize: 72 }} color={'error'} />
                            )
                        ) : null
                    }
                </div>
                <div className="flex items-center">
                    <div className="flex-1">
                        <LinearProgress
                            value={progress}
                            variant={progress < 100 ? 'indeterminate' : 'determinate'}
                            color={status === 'error' ? 'error' : (progress < 100 ? 'info' : 'success')}
                            style={{ height: 15, borderRadius: 10 }}
                        />
                    </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {description ?? 'Se están importando sus datos. Esto puede tomar unos pocos minutos.'}
                </p>
                <div  className='flex justify-end pt-2'>
                    {
                        status == 'success' || progress >= 100 ? (
                            <Button onClick={() => queueProgressApp.removeQueue(id)}>Cerrar</Button>
                        ) : null
                    }
                </div>
            </CardContent>
        </Card>
    )
}
