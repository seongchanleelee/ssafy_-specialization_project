package com.ssafy.wayg.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "feedword", indexes = {
        @Index(name = "idx__feedword__count", columnList = "feedword_count"),
        @Index(name = "idx__feedword__word", columnList = "feedword_word"),
        @Index(name = "idx__feedword__name", columnList = "feedword_name")
})
public class Feedword {
    @Id
    @Column(name = "feedword_no", nullable = false)
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer feedwordNo;

    @Column(name = "feedword_word", nullable = false, length = 45)
    private String feedwordWord;

    @Column(name="feedword_count", nullable = false)
    @ColumnDefault("0")
    private Integer feedwordCount;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "feed_no", nullable = false)
    private Feed feedNo;

    @Column(name="feedword_name", nullable = false, length = 45)
    private String feedwordName;

    public Feedword(String word, Integer count, Feed feed, String placename){
        this.feedwordWord = word;
        this.feedwordCount = count;
        this.feedNo = feed;
        this.feedwordName = placename;
    }

}