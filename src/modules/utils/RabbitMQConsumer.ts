import amqp from "amqplib";
import { addProductToElasticsearch } from "./es-events";

class RabbitMQConsumer {
  private connection!: amqp.Connection;
  private channel!: amqp.Channel;

  constructor(private url: string, private queueName: string) {
    this.start();
  }

  private async start(): Promise<void> {
    this.connection = await amqp.connect(this.url);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queueName, { durable: false });
    if (this.queueName == "product") {
      await this.channel.consume(
        this.queueName,
        this.handleProductQueue.bind(this)
      );
      console.log(`Consumer started on queue ${this.queueName}`);
    }
  }

  async stop(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
    console.log(`Consumer stopped on queue ${this.queueName}`);
  }

  async handleProductQueue(message: amqp.ConsumeMessage | null): Promise<void> {
    if (message !== null) {
      const productObj = JSON.parse(message.content.toString());
      console.log(`Received product: ${productObj.name}`);
      addProductToElasticsearch(productObj);
      await this.channel.ack(message);
    }
  }
}

export default RabbitMQConsumer;
