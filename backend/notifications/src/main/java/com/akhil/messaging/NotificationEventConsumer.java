package com.akhil.messaging;

import com.akhil.modal.Notification;
import com.akhil.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationEventConsumer {

    private final NotificationService notificationService;

    @RabbitListener(queues = "notification-queue")
    public void sentBookingUpdateEvent(Notification notification){
        notificationService.createNotification(notification);
    }

}
