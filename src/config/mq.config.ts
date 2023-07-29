import amqp from 'amqplib'

export async function MqConnect(queueName: string){
    const connection = await amqp.connect(process.env.RABBIT_MQ_URL || "")
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, {durable:false})

    return channel
}
