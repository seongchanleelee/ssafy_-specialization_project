package com.ssafy.wayg.entity;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Data
@Entity
@Table(name = "placescrap")
public class Placescrap {
    @Id
    @Column(name = "scrap_no", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer scrapNo;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_no", nullable = false)
    private User userNo;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "place_no", nullable = false)
    private Place placeNo;

}