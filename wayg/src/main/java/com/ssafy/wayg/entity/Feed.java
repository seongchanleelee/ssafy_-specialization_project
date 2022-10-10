package com.ssafy.wayg.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.Instant;

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "feed")
public class Feed {
    @Id
    @Column(name = "feed_no", nullable = false)
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer feedNo;

    @Column(name = "feed_title", nullable = false, length = 45)
    private String feedTitle;

    @Column(name = "feed_content", nullable = false, length = 100)
    private String feedContent;
    
    @Column(name = "feed_nickname", nullable = false, length = 10)
    private String feedNickname;

    @Column(name = "feed_like")
    @ColumnDefault("0")
    private Integer feedLike;

    @Column(name = "feed_regdate")
    private Instant feedRegdate;

    @Column(name = "feed_placename", length = 45)
    private String feedPlacename;

    @Column(name = "feed_file")
    private String feedFile;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_no", nullable = false)
    private User userNo;

}