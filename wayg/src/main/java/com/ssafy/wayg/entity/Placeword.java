package com.ssafy.wayg.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "placeword", indexes = {
        @Index(name = "idx__placeword__count", columnList = "placeword_count"),
        @Index(name = "idx__placeword__word", columnList = "placeword_word"),
//        @Index(name = "idx__placeword__name", columnList = "placeword_name")
})
public class Placeword {
    @Id
    @Column(name = "placeword_no", nullable = false)
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer placewordNo;

    @Column(name="placeword_name" , length = 100)
    private String placewordName;

    @Column(name = "placeword_word", nullable = false, length = 45)
    private String placewordWord;

    @Column(name="placeword_count")
    private Integer placewordCount;

//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    @JoinColumn(name = "place_no", nullable = false)
//    private Place placeNo;

}